import { useRecentActivityContext } from '@/context/RecentActivityContext'
import {
  AppShell,
  Stack,
  Group,
  Text,
  Avatar,
  Badge,
  Paper,
  Button,
} from '@mantine/core'
import { useState } from 'react'
// import {
//   IconInfoCircle,
//   IconAlertTriangle,
//   IconCheck,
//   IconX,
//   IconUser,
//   IconServer,
// } from '@tabler/icons-react'

// const typeIcon = {
//   info: <IconInfoCircle size={18} color="#1c7ed6" />,
//   warning: <IconAlertTriangle size={18} color="#f59f00" />,
//   error: <IconX size={18} color="#e03131" />,
//   success: <IconCheck size={18} color="#2f9e44" />,
//   system: <IconServer size={18} color="#7048e8" />,
//   user: <IconUser size={18} color="#495057" />,
// }

const typeColor = {
  info: 'blue',
  warning: 'yellow',
  error: 'red',
  success: 'green',
  system: 'violet',
  user: 'gray',
}

const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false)
  const { state } = useRecentActivityContext()

  const displayedActivities = showAll
    ? state.activities
    : state.activities.slice(0, 5)

  return (
    <AppShell.Section className="p-2 rounded-lg mb-5">
      <Text size="sm" fw={600} mb="xs">
        Recent Activity
      </Text>

      <Stack gap="sm">
        {displayedActivities?.map((activity) => (
          <Paper
            key={activity.id}
            shadow="xs"
            p="xs"
            radius="md"
            withBorder
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderLeft: `4px solid var(--mantine-color-${typeColor[activity.type]}-6)`,
            }}
          >
            {/* Main Content */}
            <div style={{ flexGrow: 1 }}>
              <Group justify="space-between">
                <Text size="xs" fw={500}>
                  {activity.message}
                </Text>
              </Group>

              <Group justify="space-between">
                <Group mt={4} gap="xs">
                  {/* User Avatar */}
                  {activity.user && (
                    <Group gap="xs">
                      <Avatar
                        src={activity.user.avartar}
                        size={18}
                        radius="xl"
                      />
                      <Text size="10px" c="dimmed">
                        {activity.user.name}
                      </Text>
                    </Group>
                  )}

                  {/* Timestamp */}
                  <Text size="10px" c="dimmed">
                    {new Date(activity.timestamp).toLocaleString()}
                  </Text>
                </Group>

                <Badge
                  color={typeColor[activity.type]}
                  variant="light"
                  size="xs"
                >
                  {activity.entity}
                </Badge>
              </Group>
            </div>
          </Paper>
        ))}

        {state.activities.length > 5 && (
          <Button
            variant="subtle"
            size="xs"
            onClick={() => setShowAll((prev) => !prev)}
            mt="xs"
          >
            {showAll ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </Stack>
    </AppShell.Section>
  )
}

export default RecentActivity
