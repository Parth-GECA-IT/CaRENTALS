"use client"
import React from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

const variantStyles = {
    success: {
        icon: <CheckCircle className="text-white w-6 h-6" />,
        titleClass: "text-white",
        desc: "text-gray-200",
    },
    error: {
        icon: <XCircle className="text-white w-6 h-6" />,
        titleClass: "text-white",
        desc: "text-gray-200",
    },
    warning: {
        icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
        titleClass: "text-yellow-700",
        desc: "text-yellow-500",
    },
    info: {
        icon: <Info className="text-blue-500 w-6 h-6" />,
        titleClass: "text-blue-700",
        desc: "text-blue-500",
    },
    default: {
        icon: null,
        titleClass: "text-black",
        desc: "text-gray-500",
    },
}

export const CustomToast = ({ title, description, variant = "default" }) => {
    const { icon, titleClass, desc } = variantStyles[variant] || variantStyles.default

    return (
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <p className={` font-semibold ${titleClass}`}>{title}</p>
                {description && <p className={`text-sm ${desc}`}>{description}</p>}
            </div>
        </div>
    )
}