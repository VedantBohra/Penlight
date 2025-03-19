import { useEditor , EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useState , useEffect} from "react"
import Placeholder from "@tiptap/extension-placeholder";
import { useLocation , useParams , useNavigate} from 'react-router-dom';
import axios from 'axios'
import z from "zod"
import { Loader } from './Loader';

const extensions = [StarterKit ,
    Placeholder.configure({
        placeholder: ({editor}) => 
            editor.getText().trim().length === 0 ? "Start writing..." : ""
    }),
]

const zodTitle = z.string().min(1)
const zodContent = z.string().refine((text) => text.split(/\s+/).length >= 100 , {message : "Content should consist at least 100 Words"})

interface TipTapProps{
    onEditorContentSave? : (html : string ,postTitle : string , isPublished : Boolean) => void ,
    content? : string,
    postTitle? : string,
    postEditPublished? : Boolean
    setLoading? : (value : boolean) => void
}

const Tiptap : React.FC<TipTapProps> = ({onEditorContentSave = () => {}, content = "", postTitle = "" , postEditPublished = false , setLoading = () => {}}) => {
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const [title , setTitle] = location.pathname === "/editor" ?  useState<string | null>(null) : useState<string>(postTitle || " ")
    const [postPublished , setPostPublished] = useState<Boolean>(false)
    const [showDialog , setShowDialog] = useState<Boolean>(false)
    const [showTitleDialog , setShowTitleDialog] = useState<Boolean>(false)
    const [showContentDialog , setShowContentDialog] = useState<Boolean>(false)
    const [loader , setLoader] = useState<Boolean>(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    setLoading(title?.trim() == "" && content?.trim() == "")
  }, [title , content])

  useEffect(() => {
    setPostPublished(postEditPublished)
  },[postEditPublished])

  useEffect(() => {
    if(postTitle){
        setTitle(postTitle)
    }
  },[postTitle])

  const editor = useEditor({
    extensions,
    content : content || ``,
  })

  useEffect(() => {
    if (editor && content !== undefined) {
        editor.commands.setContent(content);
    }
}, [content, editor]);

  if(!editor){
    return null
  }

  const handleEditorContent = (isPublished : Boolean) => {
    const html = editor.getHTML()
    const MIN_WORD_COUNT = 100

    const validatedHtml = (html : string) => {
        const wordCount = html.trim().split(/\s+/).length
        return wordCount >= MIN_WORD_COUNT
    }

    if(!validatedHtml(html)){
        setShowContentDialog(true)
        return
    }

    const validatedTitle = zodTitle.safeParse(title)
    if(!validatedTitle.success){
        setShowTitleDialog(true)
        return
    }
    else{
        const postTitle = validatedTitle.data

        onEditorContentSave(html, postTitle?? "" , isPublished)
    }
  }

  const saveClickHandler = async () => {
    try{
            setLoader(true)
            setShowDialog(false)
            const validatedTitle = zodTitle.safeParse(title)
            if(!validatedTitle.success){
                setShowTitleDialog(true)
                setLoader(false)
                return
            }
            else{
                setShowTitleDialog(false)
            }
            
            const currentContent = editor.getHTML()
            const validatedContent = zodContent.safeParse(currentContent)
            if(!validatedContent.success){
                setShowContentDialog(true)
                setLoader(false)
                return
            } 
            else{
                setShowContentDialog(false)
            }  
               const token = sessionStorage.getItem("token")
               const response = await axios.put(`${BACKEND_URL}/api/v1/blog/edit/${params.id}` , 
            {
                ...(validatedTitle && {validatedTitle}) ,
                ...(validatedContent && {validatedContent}),
                published : true                
            } ,
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            }
        )

        setLoader(false)

        if(response.status === 200 || response.status === 204){
            setShowTitleDialog(false)
            setShowContentDialog(false)
            navigate(`/blog/${params.id}`)
        }
    }
    catch(error : unknown){
        setLoader(false)
        if(axios.isAxiosError(error)){
            const errorCode = error.response?.status ?? 500
            navigate('/error' , {state : {errorCode}})
        }
        else{
            const errorCode = 100
            navigate('/error' , {state : {errorCode}})
        }
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-purple-50">
        {loader && (
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        )}
        <div className="h-12 w-full flex justify-center">
            <input type="text" placeholder='Title ...' value={title ?? ""} onChange={(e) => {setTitle(e.target.value)}} className="bg-white shadow-lg outline-none rounded-full h-full w-[35rem] 
            indent-4 text-xl font-semibold placeholder:font-normal focus:border border-green-200"/>
        </div>
    <div className="flex flex-col gap-4 pl-2 pr-4">
<div className="flex gap-2 border border-black h-12 w-fit items-center px-2 bg-blue-50">
    <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}     
    >
        Bold
    </button>

    <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}    
    >
        Italic
    </button>

    <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
    >
        Strike
    </button>

    <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('code') ? 'bg-gray-300' : ''}`}
    >
        Code
    </button>

    <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('codeBlock') ? 'bg-gray-300' : ''}`}
    >
        Code block
    </button>

    <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('paragraph') ? 'bg-gray-300' : ''}`}
    >
        Paragraph
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 1}) ? 'bg-gray-300' : ''}`}
    >
        H1
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 2}) ? 'bg-gray-300' : ''}`}
    >
        H2
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 3}) ? 'bg-gray-300' : ''}`}
    >
        H3
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 4}) ? 'bg-gray-300' : ''}`}
    >
        H4
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 5}) ? 'bg-gray-300' : ''}`}
    >
        H5
    </button>

    <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('heading' , {level: 6}) ? 'bg-gray-300' : ''}`}
    >
        H6
    </button>

    <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
    >
        Bullet
    </button>

    <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
    >
        Ordered list
    </button>

    <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full ${editor.isActive('blockquote') ? 'bg-gray-300' : ''}`}
    >
        Blockquote
    </button>

    <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full"
    >
        Undo
    </button>

    <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-6 text-xs font-medium cursor-pointer px-2 py-1 border rounded-full"
    >
        Redo
    </button>
</div>


        <div>
            <EditorContent editor={editor} className="h-[30rem] border border-gray-300 overflow-y-auto custom-editor"/>
        </div>
        <div className="flex gap-5 w-full justify-center">
               {location.pathname.includes("/update") ? 
               <button className="px-2 py-1 w-[5rem] border rounded-full bg-green-400 text-medium cursor-pointer"      
                onClick={() => {postPublished ? saveClickHandler() : setShowDialog(true)}
                }
                >Save</button> :
                <button className="px-2 py-1 w-[5rem] border rounded-full bg-green-400 text-medium cursor-pointer"      
                onClick={() => handleEditorContent(false)}
                >Save</button>}
                {location.pathname.includes("/update") ? 
                null :  <button className="px-2 py-1 w-[5rem] border rounded-full bg-green-400 text-medium cursor-pointer"
                onClick={() => handleEditorContent(true)} >Publish</button>}
        </div>
    </div>

    { !showTitleDialog && !showContentDialog ? 
        showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={() => setShowDialog(false)} 
          ></div>

          <div className="relative z-10 bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Do you want to publish it?</h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                onClick={() => setShowDialog(false)}
              >
                No
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer" onClick={saveClickHandler}>
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

    {showTitleDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={() => setShowTitleDialog(false)}
        ></div>

    <div className="relative z-10 bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">The title must have at least one character.</h2>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => setShowTitleDialog(false)}
        >
          OK
        </button>
      </div>
    </div>
    </div>
    )}

    {showContentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={() => setShowContentDialog(false)}
        ></div>

    <div className="relative z-10 bg-white p-6 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Your blog must contain at least 100 words to be published.</h2>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => setShowContentDialog(false)}
        >
          OK
        </button>
      </div>
    </div>
    </div>
    )}
    {loader && <Loader/>}
    </div>
  )
}

export default Tiptap
