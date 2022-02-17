import produce from 'immer'

const initialState = {
  user: {
    nickname: '',
    profileImageUrl: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return produce(state, draft => {
        draft.user = action.payload
      })
    default:
      return state
  }
}

export default reducer