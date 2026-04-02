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
  { value: '1,500+', label: 'のべ体験者数' },
  { value: '500+', label: '出前授業参加人数' },
  { value: '13', label: '活動年数' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    school: '室蘭市立みなと小学校',
    role: '児童の声',
    comment: 'とてもわかりやすくて楽しかった。将来建築士になりたい気持ちが高まった。',
  },
  {
    id: 't2',
    school: '千歳市立千歳小学校',
    role: '児童の声',
    comment: 'ふだん聞けないような話を建築士さんに聞けて楽しかった。実際に考えてみて家を建てるのはむずかしくてもとても楽しかった。',
  },
  {
    id: 't3',
    school: '実施校 担当教諭',
    role: '先生の声',
    comment: '直感的に扱えるアプリと講師の方のわかりやすいお話により、子どもたちは実際に生活する人のことを考えて間取りを考えることができていたと思います。住宅設計の難しさについても実感することができたと思います。',
  },
];
