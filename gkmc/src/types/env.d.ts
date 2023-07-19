declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      FIREBASE_AUTH_EMULATOR_HOST: string
      API_URL: string
      PROV_AUTH_TOKEN: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}