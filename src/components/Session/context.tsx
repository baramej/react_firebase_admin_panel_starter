import * as React from "react"
import firebase from "firebase/app"

const AuthUserContext =
  React.createContext<(firebase.User & { role: string }) | undefined>(undefined)

export default AuthUserContext
