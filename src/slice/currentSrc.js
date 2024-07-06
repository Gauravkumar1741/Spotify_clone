import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSrc: '', 
    listaBrani: false,
    branoCorrente: 0
}

const currentSrcSlice = createSlice({
    name: 'currentSrc',
    initialState: initialState,
    reducers: {
        setCurrentSrc(state, action) {
            state.currentSrc = action.payload;
            console.log(action.payload);
        },
        setListaBrani(state, action) {
            state.listaBrani = action.payload;
            console.log(state.listaBrani)
        },
        setBranoCorrente(state, action) {
            state.branoCorrente = action.payload;
            console.log(action.payload)
        },
        plusOneBrano(state, action) {
            if (action.payload === 1) {
                if (state.listaBrani.length <= state.branoCorrente + 1) {
                  state.branoCorrente = 0;
                } else {
                  state.branoCorrente += 1;
                }
              } else if (action.payload === 0) {
                console.log(state.branoCorrente);
                if(state.branoCorrente === 0){
                    state.branoCorrente = state.listaBrani.length - 1
                } else {
                state.branoCorrente -= 1;
                }
                }
            // console.log(state.branoCorrente)
        },
        prendiSrcDaBrano(state) {
            const { listaBrani, branoCorrente } = state;
            // Verifica che listaBrani sia un array e branoCorrente sia un indice valido
            if (Array.isArray(listaBrani) && branoCorrente >= 0 && branoCorrente < listaBrani.length) {
                const srcDaBrano = listaBrani[branoCorrente].preview;
                state.currentSrc = srcDaBrano;
                // console.log(srcDaBrano);
            } else {
                console.error('Errore: listaBrani non è un array o branoCorrente è un indice non valido.');
            }
        }

    }
});

const { reducer, actions } = currentSrcSlice;

export const { setCurrentSrc, setListaBrani, setBranoCorrente, plusOneBrano, prendiSrcDaBrano } = actions;

export default reducer;

