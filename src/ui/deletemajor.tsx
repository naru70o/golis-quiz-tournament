import { deleteMajor } from '@/app/actions/action'
import { Trash } from 'lucide-react'

export default function Deletemajor({majorId}:{majorId:string}) {
  return (
    <div className="flex items-center gap-2 mt-1">
    <div>
      <Trash size={16} strokeWidth={1} />
    </div>
    <div onClick={() => deleteMajor(majorId)}>Delete</div>
  </div>
  )
}
