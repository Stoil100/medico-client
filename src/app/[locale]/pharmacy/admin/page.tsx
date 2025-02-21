import PharmacyAddPharmacistForm from '@/components/forms/pharmacy'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function PharmacyAdminPage() {
    const t = useTranslations("Pages.Pharmacy.Admin")
  return (
    <div>
        <PharmacyAddPharmacistForm t={(key)=>t(`form.${key}`)}/>
    </div>
  )
}
