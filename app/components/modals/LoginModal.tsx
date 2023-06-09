'use client'

import { Button } from '@/app/components/Button'
import { Heading } from '@/app/components/Heading'
import { Input } from '@/app/components/inputs/Input'
import { Modal } from '@/app/components/modals/Modal'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

export const LoginModal: FC = () => {
  const router: AppRouterInstance = useRouter()

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
    setIsLoading(true)

    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged In')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = useCallback((): void => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent: JSX.Element = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent: JSX.Element = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button outline label="Login with Google" icon={FcGoogle} onClick={() => signIn('google')} />
      <Button
        outline
        label="Login with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div onClick={toggle} className="cursor-pointer text-neutral-800 hover:underline">
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
