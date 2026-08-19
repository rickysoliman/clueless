import { useState } from "react";

import HomePage from "@/components/home-page";
import LandingPage from "@/components/landing-page";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <HomePage onLogOut={() => setIsLoggedIn(false)} />;
  }

  return (
    <LandingPage
      onLogIn={() => setIsLoggedIn(true)}
      onCreateAccount={() => setIsLoggedIn(true)}
    />
  );
}
