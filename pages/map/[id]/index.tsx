import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Navbar, Layout, Sidebar } from '../../../components/Layout'
import { GameSettings } from '../../../components/GameSettings'
import { useState } from 'react'
import StyledMapPage from '../../../styles/MapPage.Styled'
import { Avatar, Button, FlexGroup } from '../../../components/System'
import { GameSettingsType, MapType } from '../../../types'
import { MapStats } from '../../../components/MapStats'
import { LeaderboardCard } from '../../../components/Results'
import { MapLeaderboard } from '../../../components/MapLeaderboard'
import { MapPreviewCard } from '../../../components/Home/MapPreviewCard'
import { Modal } from '../../../components/Modals/Modal'

const MapPage: NextPage = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)

  const closeModal = () => {
    setSettingsModalOpen(false)
  }

  const map: MapType = {
    id: 'world',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 2500000,
    likes: 92453,
    locations: [{lat: 0, lng: 0}],
    creator: 'GeoHub',
    previewImg: '/images/worldMap.jpg',
    avgScore: 11368
  }

  const leaderboard = [
    {
      user: {avatar: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg', name: 'BenZ'},
      rounds: [
        {points: 3297, distance: 2215, time: '1:23'},
        {points: 4297, distance: 2215, time: '1:23'},
        {points: 3257, distance: 2215, time: '1:23'},
        {points: 2297, distance: 2215, time: '1:23'},
        {points: 4457, distance: 2215, time: '1:23'},
        {points: 14557, distance: 12215, time: '6:13'},
      ],
      gameId: '1234'
    },
    {
      user: {avatar: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg', name: 'BenZ'},
      rounds: [
        {points: 3297, distance: 2215, time: '1:23'},
        {points: 4297, distance: 2215, time: '1:23'},
        {points: 3257, distance: 2215, time: '1:23'},
        {points: 2297, distance: 2215, time: '1:23'},
        {points: 4457, distance: 2215, time: '1:23'},
        {points: 14557, distance: 12215, time: '6:13'},
      ],
      gameId: '123456'
    },
  ]

  const testSettings: GameSettingsType = {
    timeLimit: 0,
    canMove: true,
    canPan: true,
    canZoom: true
  }

  const testMap2: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [{lat: 0, lng: 0}],
    previewImg: '/images/LandmarksMap.jfif',
    creator: 'GeoHub'
  }

  const testMap3: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [{lat: 0, lng: 0}],
    previewImg: '/images/CanadaMap.jpg',
    creator: 'GeoHub'
  }

  const testMap4: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [{lat: 0, lng: 0}],
    previewImg: '/images/UnitedStatesMap.jpg',
    creator: 'GeoHub'
  }

  return (
    <StyledMapPage>
      <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <div className="descriptionSection">
            <FlexGroup gap={20}>
              <Avatar url={map.previewImg} alt="" size={100}/>
              <div className="textWrapper">
                <span className="name">{map.name}</span>
                <span className="description">{map.description}</span>
              </div>
            </FlexGroup>      
            <Button type="solidBlue" width="200px" callback={() => setSettingsModalOpen(true)}>Play</Button>
          </div>

          <MapStats map={map} />

          <MapLeaderboard leaderboard={leaderboard} />

          <div className="otherMapsWrapper">
            <span className="otherMapsTitle">Other Popular Maps</span>
            <div className="otherMaps">
              <MapPreviewCard map={testMap2} />
              <MapPreviewCard map={testMap3} />
              <MapPreviewCard map={testMap4} />
            </div>

          </div>

        </main>     
      </Layout>
      
      {settingsModalOpen &&
        <Modal closeModal={closeModal}>
          <GameSettings />
        </Modal>
      }
    </StyledMapPage>  
  )
}

export default MapPage