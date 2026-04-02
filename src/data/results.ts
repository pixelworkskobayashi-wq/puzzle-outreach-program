export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  school: string;
  role: string;
  comment: string;
}

export const stats: Stat[] = [
  { value: '25+', label: '実施校数' },
  { value: '1,200+', label: '累計参加人数' },
  { value: '7', label: '活動年数' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    school: '札幌市立〇〇小学校',
    role: '担任教諭',
    comment: '子どもたちが夢中になってアプリを操作していました。自分の部屋を設計するという体験が、空間への興味につながったと思います。',
  },
  {
    id: 't2',
    school: '札幌市立〇〇中学校',
    role: '技術家庭科担当',
    comment: '専門家の方から直接話を聞けることで、建築という仕事への理解が深まりました。キャリア教育の観点からも大変有意義でした。',
  },
  {
    id: 't3',
    school: '〇〇市立〇〇小学校',
    role: '校長',
    comment: '費用もかからず、準備もサポートしていただけたので学校側の負担がほとんどありませんでした。ぜひ継続して実施したいと思います。',
  },
];
