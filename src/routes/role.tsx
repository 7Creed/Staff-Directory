import DashboardLayout from '@/layout/dashboard.layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/role')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <div>Hello "/role"!</div>
    </DashboardLayout>
  )
}
