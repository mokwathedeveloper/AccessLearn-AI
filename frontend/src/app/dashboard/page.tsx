import { requireRole } from '@/lib/auth/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  await requireRole('student')

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the student dashboard. Here you can upload and view your materials.</p>
        </CardContent>
      </Card>
    </div>
  )
}
