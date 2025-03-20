import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; 

type InputLabelProps = {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
    motionProps?: any;
    onFocus?: () => void;
};

export const InputLabel = ({
    label,
    placeholder,
    className = "",
    onChange,
    type = "text",
    motionProps,
    onFocus,
}: InputLabelProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="w-full relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>

            <motion.input
                {...motionProps}
                type={inputType} 
                onChange={onChange}
                onFocus={onFocus}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 outline-none ${className}`}
                placeholder={placeholder}
                required
            />

            {type === "password" && (
                <button
                    type="button"
                    className="absolute right-3 bottom-0.5 transform -translate-y-1/2 text-gray-500 hover:text-black"
                    onClick={() => setShowPassword(!showPassword)} // ✅ Toggles password visibility
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    );
};