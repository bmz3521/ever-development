import { TabViewType, EnableSnapType } from './types'
import staticData from './config/staticData'

export const useHomeConfig = (props: any) => {

    const tabviewIndex = 'tabview'
    const enableSnapIndex = 'enableSnap'
    const tabviewType: TabViewType = staticData.homeConfig[0].data[tabviewIndex].type as TabViewType
    const enableSnap: EnableSnapType = staticData.homeConfig[1].data[enableSnapIndex].type as EnableSnapType

    return { tabviewType, enableSnap: enableSnap === EnableSnapType.enableSnap ? true : false }
}