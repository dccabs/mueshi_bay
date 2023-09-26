interface HeadingProps {
  name: string;
}

export default function Heading({ name }: HeadingProps) {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-x-3">
            <h1 className="flex gap-x-3 text-base leading-7">
              <span className="font-semibold text-white text-3xl">{name}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
