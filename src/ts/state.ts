interface State extends Object {
    title: string;
}

type Modifier = (before: State) => State;

let globalState: State = {
    title: 'hoge'
};

const state = function (modifier: Modifier): void {
    globalState = modifier(globalState);
};

export default state;
