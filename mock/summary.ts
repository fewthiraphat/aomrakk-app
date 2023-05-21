import { category } from "../types/category"

interface SummaryProps {
    label?:string,
    amount?:string,
    category?: category
    timestamp?: Date
}
export const summary: SummaryProps[] = [{
    label: 'ได้เงินค่าขนม',
    amount: '2000',
    category: 'income',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},
{
    label: 'ซื้อกาแฟ',
    amount: '2000',
    category: 'drinks',
    timestamp: new Date('2023-04-02T06:56:59.714Z')
},{
    label: 'ซื้อหนังสือเรียน',
    amount: '2000',
    category: 'study',
    timestamp: new Date('2023-03-03T06:56:59.714Z')
}
,{
    label: 'เล่นบอร์ดเกม',
    amount: '2000',
    category: 'entertain',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'ซื้อไก่จ้าาาาา',
    amount: '2000',
    category: 'gift',
    timestamp: new Date('2023-02-01T06:56:59.714Z')
},{
    label: 'ได้เงินค่าขนม',
    amount: '2000',
    category: 'income',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'เล่นบอร์ดเกม',
    amount: '2000',
    category: 'entertain',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'เล่นบอร์ดเกม',
    amount: '2000',
    category: 'entertain',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'ได้เงินค่าขนม',
    amount: '2000',
    category: 'income',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'เล่นบอร์ดเกม',
    amount: '2000',
    category: 'entertain',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},{
    label: 'เล่นบอร์ดเกม',
    amount: '2000',
    category: 'entertain',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},
{
    label: 'กิน dooki',
    amount: '600',
    category: 'food',
    timestamp: new Date('2023-05-01T06:56:59.714Z')
},
]