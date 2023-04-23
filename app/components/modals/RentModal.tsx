'use client'

import { Heading } from '@/app/components/Heading'
import { CategoryInput } from '@/app/components/categories/CategoryInput'
import { categoriesList } from '@/app/components/categories/categoriesList'
import { Counter } from '@/app/components/inputs/Counter'
import { CountrySelect, CountrySelectValue } from '@/app/components/inputs/CountrySelect'
import { ImageUpload } from '@/app/components/inputs/ImageUpload'
import { Input } from '@/app/components/inputs/Input'
import { Modal } from '@/app/components/modals/Modal'
import { useRentModal } from '@/app/hooks/useRentModal'

import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  )

  const setCustomValue = (id: string, value: any): void => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = (): void => {
    setStep((value: STEPS) => value - 1)
  }

  const onNext = (): void => {
    setStep((value: STEPS) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing Created!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo((): string => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo((): string | undefined => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent: JSX.Element = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-scroll pb-1 sm:grid-cols-2">
        {categoriesList.map(({ label, icon }) => (
          <div key={label} className="col-span-1">
            <CategoryInput
              onClick={(category: string) => setCustomValue('category', category)}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your palce located?" subtitle="Help guests find you!" />
        <CountrySelect
          value={location}
          onChange={(value: CountrySelectValue) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value: number) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value: number) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value: number) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add photo of your place" subtitle="Show guests how you place looks like!" />
        <ImageUpload
          value={imageSrc}
          onChange={(value: string) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night " />
        <Input
          id="price"
          label="Price"
          type="number"
          formatPrice
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}
