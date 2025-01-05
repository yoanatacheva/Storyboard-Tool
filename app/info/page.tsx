export default function Info() {
  return (
    <div className="h-svh flex flex-col items-center justify-center p-4 overflow-auto">
      <h1 className="font-geist font-medium text-muted-foreground text-center sm:text-xl text-md tracking-tight leading-tight p-4">
        <p className="mb-4 max-w-3xl">
          The tool is designed to simplify and accelerate storyboard creation, 
          enabling designers to create visual narratives.
          It uses a <a href="https://flux-lora.com/" target="_blank" className="text-foreground hover:text-muted-foreground transition-colors duration-300">Flux LoRA</a> model fine-tuned on a comics dataset to produce high-quality images 
          and provides a platform for creating different storyboard layouts.
        </p>
        <p className="mb-4 max-w-3xl">
          Developed during the Data Visualisation course led by <a href="https://zybinska.com/" target="_blank" className="text-foreground hover:text-muted-foreground transition-colors duration-300">Paulina Zybinska</a> at the <a href="https://www.fhnw.ch/en/about-fhnw/schools/academy-of-art-and-design" target="_blank" className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-nowrap">Basel Academy of Arts and Design</a>, 
          this project aims to blend classic black and white comic aesthetics 
          with cutting edge technology.
        </p>
        <p>
          Designed and created by <a href="https://www.instagram.com/yo.chita/" target="_blank" className="text-foreground hover:text-muted-foreground transition-colors duration-300">Yoana Tacheva</a>
        </p>
      </h1>
    </div>
  )
}