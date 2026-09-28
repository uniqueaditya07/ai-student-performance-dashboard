'use client'

import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const notifications = [
  { id: 'low-attendance', label: 'Low attendance alerts', description: 'When a student drops below the attendance threshold.', on: true },
  { id: 'risk', label: 'AI risk predictions', description: 'Weekly digest of students flagged as at-risk.', on: true },
  { id: 'marks', label: 'Marks uploaded', description: 'When internal assessment marks are published.', on: false },
  { id: 'guardian', label: 'Auto-notify guardians', description: 'Send monthly progress reports to guardians.', on: false },
]

export function SettingsForm() {
  const save = (section: string) => toast.success(`${section} settings saved`)

  return (
    <Tabs defaultValue="profile" className="flex flex-col gap-4">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Profile</CardTitle>
            <CardDescription>Your details as shown to students and administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fname">Full name</FieldLabel>
                <Input id="fname" defaultValue="Dr. Kavitha Raman" />
              </Field>
              <Field>
                <FieldLabel htmlFor="designation">Designation</FieldLabel>
                <Input id="designation" defaultValue="Associate Professor" />
              </Field>
              <Field>
                <FieldLabel htmlFor="femail">Email</FieldLabel>
                <Input id="femail" type="email" defaultValue="kavitha.raman@college.edu.in" />
              </Field>
              <Field>
                <FieldLabel htmlFor="dept">Department</FieldLabel>
                <Input id="dept" defaultValue="Computer Science & Engineering" />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={() => save('Profile')}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="thresholds">
        <Card>
          <CardHeader>
            <CardTitle>Performance Thresholds</CardTitle>
            <CardDescription>Rules used to assign performance status badges.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="t-excellent">Excellent (min. CGPA)</FieldLabel>
                <Input id="t-excellent" type="number" step="0.1" defaultValue={8.5} />
              </Field>
              <Field>
                <FieldLabel htmlFor="t-good">Good (min. CGPA)</FieldLabel>
                <Input id="t-good" type="number" step="0.1" defaultValue={7.5} />
              </Field>
              <Field>
                <FieldLabel htmlFor="t-attention">Needs Attention (below CGPA)</FieldLabel>
                <Input id="t-attention" type="number" step="0.1" defaultValue={6.0} />
              </Field>
              <Field>
                <FieldLabel htmlFor="t-attendance">Minimum attendance (%)</FieldLabel>
                <Input id="t-attendance" type="number" defaultValue={75} />
                <FieldDescription>As mandated by university regulations.</FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={() => save('Threshold')}>Save thresholds</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose which alerts you receive by email.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {notifications.map((n, i) => (
                <div key={n.id} className="flex flex-col gap-4">
                  {i > 0 && <FieldSeparator />}
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor={n.id}>{n.label}</FieldLabel>
                      <FieldDescription>{n.description}</FieldDescription>
                    </FieldContent>
                    <Switch id={n.id} defaultChecked={n.on} />
                  </Field>
                </div>
              ))}
            </FieldGroup>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={() => save('Notification')}>Save preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
