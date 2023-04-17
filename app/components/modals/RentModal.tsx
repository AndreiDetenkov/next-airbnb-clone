'use client'

import { Heading } from '@/app/components/Heading'
import { CategoryInput } from '@/app/components/categories/CategoryInput'
import { categoriesList } from '@/app/components/categories/categoriesList'
import { Modal } from '@/app/components/modals/Modal'
import { useRentModal } from '@/app/hooks/useRentModal'
import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export const RentModal = () => {
  const rentModal = useRentModal()

  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY)

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
      questCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')

  const setCustomValue = (id: string, value: string): void => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = (): void => {
    setStep((value: STEPS) => step - 1)
  }

  const onNext = (): void => {
    setStep((value: STEPS) => value + 1)
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

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}
