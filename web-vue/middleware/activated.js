export default function({ app, store, redirect, $auth }) {
  console.log("Checking if is not activated", store.state.auth.user);
  if ($auth.loggedIn && !$auth.user.isActive) {
    return redirect("/deactivated");
  }
}
