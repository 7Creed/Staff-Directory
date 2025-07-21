import { type ReactNode } from 'react'
import {
  AppShell,
  Burger,
  Group,
  Text,
  Avatar,
  Box,
  ScrollArea,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconBellFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { links } from '../data/sideBarLinks'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened] = useDisclosure(true)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header
        p="md"
        className="flex items-center justify-between border-b"
      >
        <Group>
          {isMobile && (
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
          )}
          <h1>Staff Directory</h1>
        </Group>

        <Group gap="sm">
          <Box className="p-2 bg-primary rounded-appRadius">
            <IconBellFilled size={18} color="gray" className="cursor-pointer" />
          </Box>
          <Group gap="sm" className="cursor-pointer">
            <Avatar
              src={null}
              alt={'profile'}
              radius="xl"
              color="blue"
              size={35}
              style={{ textTransform: 'uppercase' }}
            >
              AD
            </Avatar>
            <Box>
              <Text size="sm" fw={500}>
                Admin
              </Text>
            </Box>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="border-r">
        <AppShell.Section grow component={ScrollArea} mt="xl" scrollbarSize={1}>
          {links.map((link, index) => (
            <Link
              to={link.route}
              key={index}
              activeProps={{
                className: 'bg-blue-500 text-white font-medium text-white',
                style: { fontWeight: 500 },
              }}
              className="flex items-center space-x-3 p-3 my-1 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium rounded-appRadius"
            >
              {link.icon}
              <Text size="sm">{link.label}</Text>
            </Link>
          ))}
        </AppShell.Section>

        <AppShell.Section className="p-2 rounded-lg text-center mb-5">
          <Text size="sm" ta={'left'} fw={500} mb="xs">
            Want to experience in mobile?
          </Text>
          <Text size="xs" c="dimmed" lh={'17px'} fw={400} ta={'left'}>
            You can download our mobile app
            <br /> for easy review of your sales and management.
          </Text>
          <div className="flex items-end gap-3">
            <Box mb="md">
              <img src="/sidebar-image.svg" alt="Mobile App" />
            </Box>
          </div>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={'#f6f6f6'}>{children}</AppShell.Main>
    </AppShell>
  )
}

export default DashboardLayout
