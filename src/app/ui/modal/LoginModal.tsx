"use client";
import axios from "axios";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { Heading, Input, Button } from "@/app/components";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginModal, useRegisterModal } from "@/app/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit,
        formState: { errors } } =
        useForm<FieldValues>({
            defaultValues: {
                email: '', password: ''
            }
        });
    
    const changeModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal]) 
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect:false
        })
            .then((callback) => {
                setIsLoading(false);
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
        })  
    }
    const bodyContent = (<div className="flex flex-col gap-4">
        <Heading
            title="Welcome Back to Airbnb Clone"
            subtitle="Login to your account!"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
        <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>)

    const footerContent = (<div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
        <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn('github')} />
        <div className="text-neutral-500 mt-4 font-light">
            <div className="flex flex-row justify-center items-center gap-2 text-center">
                <p className="">
                    First time using this app?
                </p>
                <p  onClick={changeModal}
                    className="text-rose-500 cursor-pointer hover:underline">
                    Sign Up an Account
                </p>
            </div>
        </div>
    </div>)
    return (
        <Modal
            disabled={isLoading}
            openModal={loginModal.isOpen}
            title="Log In to Airbnb Clone"
            actionLabel="Log In"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
export default LoginModal;
