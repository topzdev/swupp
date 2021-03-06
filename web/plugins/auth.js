export default function({ app, $auth, redirect }) {
  if (!$auth.loggedIn) {
    return;
  }

  //   if ($auth.loggedIn && !$auth.user.isActive) {
  //     return redirect("/deactivated");
  //   }
  app.router.beforeEach((to, from, next) => {
    if ($auth.loggedIn && !$auth.user.isActive) {
      next();
      redirect("/deactivated");
    } else next();
  });
}
