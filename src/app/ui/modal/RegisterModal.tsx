"use client";
import axios from "axios";
import Modal from "./Modal";
import { Heading, Input, Button } from "@/app/components";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginModal, useRegisterModal } from "@/app/hooks";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit,
        formState: { errors } } =
        useForm<FieldValues>({
            defaultValues: {
                name: '', email: '', password: ''
            }
        });
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong. Please try again.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    
    const changeModal = () => {
        registerModal.onClose();
        loginModal.onOpen();
    }

    const bodyContent = (<div className="flex flex-col gap-4">
        <Heading
            title="Welcome to Airbnb Clone"
            subtitle="Create an account here!"
        />
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
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
                    Already have an account?
                </p>
                <p  onClick={changeModal}
                    className="text-rose-500 cursor-pointer hover:underline">
                    Log in
                </p>
            </div>
        </div>
    </div>)
    return (
        <Modal
            disabled={isLoading}
            openModal={registerModal.isOpen}
            title="Sign Up to Airbnb Clone"
            actionLabel="Sign Up"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
export default RegisterModal;
