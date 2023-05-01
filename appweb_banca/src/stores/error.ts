import { defineStore } from 'pinia';

interface IError{
  mensaje: string
}

interface IState{
  error: IError | null
}

export const useErrorStore = defineStore('error', {
  state: ():IState=>{
    return{
      error: null
    }
  },

  actions:{
    resetarError(){
      this.error = null;
    },
    setError(error:any){
      this.error = error;
    }
  }
})