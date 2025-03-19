import { BrowserRouter , Route , Routes } from "react-router-dom"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Blog} from "./pages/Blog"
import {Blogs} from "./pages/Blogs"
import {Home} from "./pages/Home"
import {Editor} from "./pages/Editor"
import { UpdateBlog } from "./pages/UpdateBlog"
import { GlobalError } from "./pages/GlobalError"
import { Landing } from "./pages/Landing"
import { KnowMore } from "./pages/KnowMore"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/signin" element = {<Signin/>} />
          <Route path = "/blog/:id" element = {<Blog/>} />
          <Route path = "/myblogs" element = {<Blogs/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/editor" element = {<Editor/>}/>
          <Route path="/update/:id" element = {<UpdateBlog/>} /> 
          <Route path="/error" element = {<GlobalError/>}></Route>
          <Route path="/landing" element= {<Landing/>}></Route>
          <Route path="/knowMore" element= {<KnowMore/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
