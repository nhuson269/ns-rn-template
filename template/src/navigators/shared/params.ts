export type WebParams = {
  url: string;
};

export type SignInDemoParams = {
  username?: string;
  onNavigateSuccess?: 'goTodoListHerokuapp' | 'goTodoListTypicode';
};

export type SignUpDemoParams = {
  username?: string;
};

export type ForgotPasswordDemoParams = {
  username?: string;
};

export type TodoListDemoParams = {
  type: 'Herokuapp' | 'Typicode';
};
