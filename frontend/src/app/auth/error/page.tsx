import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Something went wrong during authentication. Please try again.</p>
          <Button asChild className="w-full">
            <Link href="/auth/sign-in">Back to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
