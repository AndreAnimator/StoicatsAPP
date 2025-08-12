import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, Output,
  Renderer2,
  ViewChild,
  ElementRef,
  EventEmitter,
  Input, } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { TheCatApiServiceService } from '../services/the-cat-api-service.service';
import { StoicismQuoteAPIServiceService } from '../services/stoicism-quote-apiservice.service';
import { PopupModalComponent } from '../components/popup-modal-module/popup-modal/popup-modal.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
  catInfo : any;
  stoicInfo: any;

  /* press-hold button variables*/
  @ViewChild('progressBar') progressBar: ElementRef | undefined;

  @Input() duration: number = 1500;
  // @Input() backgroundColor: string = '#3498db';
  // @Input() progressColor: string = '#2980b9';
  @Input() labelStart: string = 'I want another one!';
  @Input() labelProgress: string = 'Searching for another one...';
  @Input() labelFinish: string = 'Found!';

  @Output() actionStarted = new EventEmitter<void>();
  @Output() actionCancelled = new EventEmitter<void>();
  @Output() actionFinished = new EventEmitter<void>();

  label: string = 'a';
  currentState: 'start' | 'progress' | 'finish' = 'start';
  private progressInterval: any;
  private progressWidth: number = 0;
  /* press-hold button variables*/

  constructor(private catApiService: TheCatApiServiceService,
    private stoicismApiService: StoicismQuoteAPIServiceService,
    public ModalController:ModalController,
    private renderer: Renderer2) {}

  ngOnInit() {
    this.catApiService.get().subscribe(result => this.catInfo = result,
      error => console.error('Error:', error));
    this.stoicismApiService.get().subscribe(result => this.stoicInfo = result,
      error => console.error('Error:', error));
    this.label = this.labelStart;
  }

  ngAfterViewInit() {
    setTimeout(function() {
      $(".dialog a").first().addClass("active");
    }, 1000);

    $(".dialog a").on("mouseover", function() {
      $(".dialog a").removeClass("active");
      $(this).addClass("active");
    });
  }

  async popup(cat: any){
    const modal = this.ModalController.create({
        component:PopupModalComponent,
        componentProps: {
            catInfo: cat
        }
    });
    console.log(cat);
    await (await modal).present();
  }

  /* press-hold button functions*/
  startAction(event: Event): void{
    event.preventDefault();
    if (this.progressWidth < 100){
      this.clearProgress();
      this.label = this.labelProgress;
      this.currentState = 'progress';
      this.actionStarted.emit();
      this.progressInterval = setInterval(() => {
        this.progressWidth = Math.min(
          100,
          this.progressWidth + 100 / (this.duration / 100)
        );
        this.updateProgress();
        if(this.progressWidth >= 100){
          this.actionSucces();
        }
      }, 100);
    }
  }

  stopAction(event?: Event): void {
    if(event){
      event.preventDefault();
    }
    if(this.progressWidth < 100){
      this.label = this.labelStart;
      this.currentState = 'start';
      this.actionCancelled.emit();
      clearInterval(this.progressInterval);
      this.progressInterval = setInterval(() => {
        this.progressWidth = Math.max(
          0,
          this.progressWidth - 100 / (this.duration / 100)
        );
        this.updateProgress();
        if(this.progressWidth <= 0){
          clearInterval(this.progressInterval);
        }
      }, 100);
    }
  }

  private actionSucces(): void {
    clearInterval(this.progressInterval);
    this.label = this.labelFinish;
    this.currentState = 'finish';
    this.actionFinished.emit();
    window.location.reload(); //i think using Angular Router wont work that well
  }

  private updateProgress(): void{
    if(this.progressBar && this.progressBar.nativeElement){
      this.renderer.setStyle(
        this.progressBar.nativeElement,
        'width',
        `${this.progressWidth}%`
      );
    }
  }

  private clearProgress(): void {
    if (this.progressWidth < 100 && this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progressWidth = 0;
    this.updateProgress();
  }
}
