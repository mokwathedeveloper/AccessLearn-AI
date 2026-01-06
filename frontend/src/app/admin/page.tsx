import { requireRole } from '@/lib/auth/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminPage() {
  await requireRole('admin')

  return (
    <div className="container mx-auto p-8">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Admin Console</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome, Admin. Use this console to manage users and content.</p>
        </CardContent>
      </Card>
    </div>
  )
}
