export const environment = {
  production: true,
  API_KEY: JSON.parse(process.env["API_KEY"] || 'DEF_A' as string) ,
};
