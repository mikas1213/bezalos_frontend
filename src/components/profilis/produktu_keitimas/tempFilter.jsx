'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpDown } from 'lucide-react'

interface FoodItem {
  name: string;
  grams: number;
  category: string;
}

const foodItems: FoodItem[] = [
  { name: "Ankštinių kultūrų makaronai", grams: 166, category: "Grūdiniai" },
  { name: "Augalinis gėrimas", grams: 1443, category: "Gėrimai" },
  { name: "Avižirniai (iš skardinės)", grams: 641, category: "Ankštiniai" },
  { name: "Avižiniai dribsniai", grams: 190, category: "Grūdiniai" },
  { name: "Avižiniai miltai", grams: 161, category: "Grūdiniai" },
  { name: "Avižinės porcijinės duonelės", grams: 316, category: "Kepiniai" },
  { name: "Avižos be glitimo", grams: 142, category: "Grūdiniai" },
  { name: "Avižų jogurtas", grams: 1017, category: "Pieno produktai" },
  { name: "BBQ padažas", grams: 476, category: "Padažai" },
  { name: "Balzaminio acto kremas", grams: 481, category: "Padažai" },
  { name: "Beigeliai", grams: 241, category: "Kepiniai" },
  { name: "Blynų mišinys", grams: 173, category: "Grūdiniai" },
  { name: "Bolivinė balanda", grams: 167, category: "Grūdiniai" },
  { name: "Bulvių virtinukai (gnocchi)", grams: 500, category: "Grūdiniai" },
  { name: "Bulvės", grams: 826, category: "Daržovės" },
]

export default function EnhancedFoodExchangeList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState(foodItems)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    let result = foodItems

    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory)
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.grams - b.grams
      } else {
        return b.grams - a.grams
      }
    })

    setFilteredItems(result)
  }, [searchTerm, sortOrder, selectedCategory])

  const categories = Array.from(new Set(foodItems.map(item => item.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Maisto produktų sąrašas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Ieškoti produktų..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg rounded-full border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full ${!selectedCategory ? 'bg-primary text-primary-foreground' : ''}`}
              >
                Visi
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full ${selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-muted-foreground hover:text-primary"
              >
                Rūšiuoti pagal gramažą
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{item.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {item.category}
                    </Badge>
                  </div>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {item.grams} g
                  </Badge>
                </CardContent>
              </Card>
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Produktų nerasta
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}