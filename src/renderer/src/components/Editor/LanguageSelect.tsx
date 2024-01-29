import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Props = {
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const LanguageSelect: React.FC<Props> = ({ language, setLanguage }) => {
  // Load the saved language from localStorage when the component mounts
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save the selected language to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="javascript">Javascript</SelectItem>
          <SelectItem value="typescript">Typescript</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect
