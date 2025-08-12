export const environment = {
  production: true,
  API_KEY: JSON.parse(process.env["API_KEY"] || 'DEF_A' as string),
  SERVER: JSON.parse(process.env["SERVER"] || 'DEF_B' as string)
};
