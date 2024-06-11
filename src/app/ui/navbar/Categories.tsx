import { Container, CategoryBox } from "@/app/components";
import { categories } from "@/app/constants";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === "/";
    if (!isMainPage) {
        return null;
    }

    return (
    <Container>
          <div className="pt-4 flex flex-row justify-between items-center overflow-x-auto">
              {categories.map((cat) => (
                  <CategoryBox key={cat.id}
                      {...cat}
                      selected={category === cat.label}
                  />
             ))} 
          </div>
    </Container>
  )
}

export default Categories;
