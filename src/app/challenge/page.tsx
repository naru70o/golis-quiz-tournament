import Navigation from '@/components/navigation'
import NewChallengeModel from '@/components/newChallenge'
import OpenModel from '@/ui/openModel'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-4">
          <Navigation />
      <div className="self-end">
        <OpenModel
        modelid={"major_form_modal"}
        modelName={"New Challenge"}
        dialog={<NewChallengeModel />}
        />
      </div>
    </div>
  )
}
