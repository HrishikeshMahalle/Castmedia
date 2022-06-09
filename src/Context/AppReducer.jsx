export default function AppReducer(state, action) {
  console.log("Im reducer",action.type,action.payload)
  switch (action.type) {
    case "ADD_TO_LIKELIST":
      return { ...state, likeList: [...state.likeList, action.payload] };
    case "ADD_TO_HISTORYLIST":
      return { ...state, historyList: [...state.historyList, action.payload] };
    case "ADD_TO_WATCHLATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };
    default:
      return { ...state };
  }
}
