import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of engineering teams building the future with DevScale. 
              Start for free, scale as you grow.
            </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                Get Started for Free
              </Button>
               <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-muted/50 to-transparent" />
    </section>
  )
}
