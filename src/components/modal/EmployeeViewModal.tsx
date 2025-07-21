import type { Employee } from '@/types'
import {
  Modal,
  Text,
  Group,
  Stack,
  Title,
  Button,
  Card,
  Divider,
  Avatar,
  Box,
  Badge,
  Flex,
} from '@mantine/core'
import {
  IconUser,
  IconMapPin,
  IconBuilding,
  IconBriefcase,
  IconStar,
  IconMail,
  IconId,
} from '@tabler/icons-react'

interface EmployeeViewModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
}

export const EmployeeViewModal = ({
  isOpen,
  onClose,
  employee,
}: EmployeeViewModalProps) => {
  if (!employee) return null

  return (
    <Modal
      size="xl"
      opened={isOpen}
      onClose={onClose}
      title={
        <Title order={3} fw={600}>
          Employee Profile
        </Title>
      }
      centered
      padding="xl"
      radius="md"
    >
      <Card withBorder p="lg" radius="md" shadow="sm">
        <Flex gap="md" align="center" mb="xl">
          <Avatar size="xl" radius="xl" color="blue">
            {employee.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar>
          <Box>
            <Title order={3}>{employee.name}</Title>
            <Badge color="blue" variant="light" size="lg" mt={4}>
              {employee.role}
            </Badge>
          </Box>
        </Flex>

        <Stack gap="lg">
          <Box>
            <Title order={5} mb="sm" c="dimmed" fw={500}>
              <Group gap="xs">
                <IconUser size={18} />
                Personal Information
              </Group>
            </Title>
            <Divider mb="sm" />
            <Stack gap="xs">
              <Group gap="xs">
                <IconId size={18} color="var(--mantine-color-blue-6)" />
                <Text span fw={500}>
                  Employee ID:
                </Text>
                <Text>{employee.id}</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={18} color="var(--mantine-color-blue-6)" />
                <Text span fw={500}>
                  Email:
                </Text>
                <Text>{employee.email || 'Not provided'}</Text>
              </Group>
            </Stack>
          </Box>

          <Box>
            <Title order={5} mb="sm" c="dimmed" fw={500}>
              <Group gap="xs">
                <IconMapPin size={18} />
                Location
              </Group>
            </Title>
            <Divider mb="sm" />
            <Stack gap="xs">
              <Group gap="xs">
                <Text span fw={500}>
                  Address:
                </Text>
                <Text>{employee.address}</Text>
              </Group>
              <Group gap="xs">
                <Text span fw={500}>
                  Country:
                </Text>
                <Text>{employee.country}</Text>
              </Group>
              <Group gap="xs">
                <Text span fw={500}>
                  Subcountry:
                </Text>
                <Text>{employee.subcountry}</Text>
              </Group>
            </Stack>
          </Box>

          {/* Work Information Section */}
          <Box>
            <Title order={5} mb="sm" c="dimmed" fw={500}>
              <Group gap="xs">
                <IconBriefcase size={18} />
                Work Information
              </Group>
            </Title>
            <Divider mb="sm" />
            <Stack gap="xs">
              <Group gap="xs">
                <IconBuilding size={18} color="var(--mantine-color-blue-6)" />
                <Text span fw={500}>
                  Department:
                </Text>
                <Text>{employee.department}</Text>
              </Group>
              <Group gap="xs">
                <IconBriefcase size={18} color="var(--mantine-color-blue-6)" />
                <Text span fw={500}>
                  Position:
                </Text>
                <Text>{employee.position}</Text>
              </Group>
              <Group gap="xs">
                <IconStar size={18} color="var(--mantine-color-blue-6)" />
                <Text span fw={500}>
                  Grade Level:
                </Text>
                <Text>{employee.gradeLevel}</Text>
              </Group>
            </Stack>
          </Box>
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </Group>
      </Card>
    </Modal>
  )
}
