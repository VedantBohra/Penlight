import { useNavigate } from "react-router-dom"

export const KnowMore = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
          <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">About Penlight</h1>
            <p className="text-gray-600 mb-4">
              Penlight is a modern and intuitive blog platform designed to provide a seamless
              writing and reading experience. Whether you're a writer looking to share your thoughts
              or a reader seeking insightful content, Penlight has something for everyone.
            </p>
            <p className="text-gray-600 mb-4">
              Our goal is to make blogging effortless by offering an elegant interface, easy
              customization, and a powerful yet simple content management system. Join our community
              and start sharing your stories today!
            </p>
            <p className="text-gray-600 mb-4">
              With features like markdown support, real-time editing, and responsive design,
              Penlight ensures that your content looks great on any device.
            </p>
            <p className="text-gray-600">
              Experience the future of blogging with Penlight - where words meet innovation.
            </p>

            <div className="w-full h-[5rem] flex px-60 pt-7">
                <button className="h-[3rem] w-[10rem] bg-blue-600 text-white 
                border rounded-full hover:bg-blue-500 cursor-pointer
                active:translate-y-1 transition-transform"
                onClick={() => {navigate("/landing")}}>
                    Back to home 
                </button>
            </div>
          </div>
        </div>
    )
}