import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SettingsForm } from '@/components/settings/settings-form'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your profile, grading thresholds and alerts." />
      <div className="max-w-3xl">
        <SettingsForm />
      </div>
    </>
  )
}
