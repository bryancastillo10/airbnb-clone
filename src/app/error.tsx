"use client"

import { useEffect } from "react";
import { EmptyState } from "./components";

interface ErrorStateProps{
    error: Error;
}

const Error = ({error}:ErrorStateProps) => {
    useEffect(() => {
        console.error(error);
    },[error])
  
    return (
    <div>
        <EmptyState
            title="OMG!"
            subtitle="Error! Something went wrong"
        />
    </div>
  )
}

export default Error
