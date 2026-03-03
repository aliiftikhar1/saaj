import {
  AnimatedHeadingText,
  BaseSection,
  BreadCrumb,
  ProductTile,
  ProductImageGallery,
} from "@/components";
import type { Metadata } from "next";
import { ProductPurchasePanel } from "@/components/common/ProductPurchasePanel/ProductPurchasePanel";
import {
  SHOP_NAVBAR_TEXT,
} from "@/components/layout/Navbar/lib";
import { routes } from "@/lib";
import { getProductBySlug, getThreeRandomProducts } from "@/lib/server/queries";
import { SizeTypeEnum } from "@prisma/client";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  props: ProductPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getProductBySlug(id);

  if (!product.success || !product.data) {
    return {
      title: "Product",
    };
  }

  return {
    title: product.data.name,
  };
}

export default async function ProductPage(props: ProductPageProps) {
  // === PROPS ===
  const { params } = props;

  // === PARAMS ===
  const { id } = await params;

  // === FETCHES ===
  const productData = await getProductBySlug(id);
  const threeRandomProductsData = await getThreeRandomProducts(id);

  if (!productData.success || !productData.data) {
    return (
      <main>
        <section className="pb-16 md:pb-25 px-5 md:px-0 w-100 md:w-75 xl:w-60">
          <BreadCrumb
            items={[{ label: SHOP_NAVBAR_TEXT, href: routes.shop }]}
          />
        </section>
      </main>
    );
  }

  // === PREPARE DATA ===
  const product = productData.data;
  const threeRandomProducts = threeRandomProductsData.success
    ? threeRandomProductsData.data
    : [];

  return (
    <main>
      <BaseSection id="support-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 ">
          <div className="pb-4">
            <BreadCrumb
              items={[
                { label: SHOP_NAVBAR_TEXT, href: routes.shop },
                { label: product.name },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 relative">
            {/* Image Gallery */}
            <div className="w-full lg:w-[50%] lg:max-w-[560px]">
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Purchase Panel */}
            <ProductPurchasePanel
              product={product}
              defaultSize={
                product.sizeType === SizeTypeEnum.OneSize
                  ? product.sizes[0]?.id
                  : ""
              }
            />
          </div>
        </div>
      </BaseSection>
      <BaseSection
        id="related-products-section"
        className="pt-10 pb-16 xl:pb-20 flex flex-col gap-8"
      >
        <AnimatedHeadingText text="Browse more" variant="product-page-title" />
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full relative">
          {threeRandomProducts.length === 0 && (
            <p>No other products available</p>
          )}
          {threeRandomProducts.length > 0 &&
            threeRandomProducts.map((product) => (
              <ProductTile
                key={product.id}
                id={id}
                slug={product.slug}
                name={product.name}
                price={Number(product.price)}
                primaryImageUrl={product.images[0] ?? ""}
                hoverImageUrl={product.images[1] ?? ""}
              />
            ))}
        </div>
      </BaseSection>
    </main>
  );
}
