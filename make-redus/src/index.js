function createStore(state, stateChanger) {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = stateChanger(state, action);
        listeners.forEach((listener) => listener())
    };
    return {getState, dispatch, subscribe}
}

function renderApp(newState, oldState = {}) {
    if (newState === oldState) return;
    renderTitle(newState.title, oldState.title);
    renderContent(newState.content, oldState.content);
}

function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return;
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = newTitle.text;
    titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
    if (newContent === oldContent) return;
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = newContent.text;
    contentDOM.style.color = newContent.color;
}

let appState = {
    title: {
        text: 'React.js小书',
        color: 'red',
    },
    content: {
        text: 'React.js小书内容',
        color: 'blue'
    }
};

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            };
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            };
        default:
            return state;
    }
}

const store = createStore(appState, stateChanger);
let oldState = store.getState();
store.subscribe(() => {
    const newState = store.getState();
    renderApp(newState, oldState);
    oldState = newState;
});

renderApp(store.getState());
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'});// 修改标题文本
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'});

