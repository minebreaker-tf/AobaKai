interface State extends Object {
    title: string;
}

type Modifier = (before: State) => State;

let globalState: State = {
    title: 'hoge'
};

function state(modifier: Modifier): void {
    globalState = modifier(globalState);
}
