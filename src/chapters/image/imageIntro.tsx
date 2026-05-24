import { Callout } from '@/components/ui/Callout'
import { FadeIn } from '@/components/ui/FadeIn'
import { Link } from 'react-router-dom'
import { ImagePlanOutline } from '@/components/image/ImagePlanOutline'
import {
  imageAcademicScope,
  imageMasteryOutcomes,
} from '@/content/image/imageCoursePlanData'
import { subCourseBasePath } from '@/content/computerVision'

export function ImageIntroView() {
  const base = subCourseBasePath('images')

  return (
    <>
      <FadeIn>
        <p className="text-lg text-muted">
          <strong className="text-deep">Plan complet du cours : Compréhension et manipulation d’images numériques</strong>
        </p>
      </FadeIn>

      <p className="mt-4 text-muted">
        Ce cours a pour objectif de te faire maîtriser les images depuis leur structure la plus fondamentale jusqu’aux
        techniques modernes de vision par ordinateur et d’intelligence artificielle.
      </p>

      <h3 className="mt-8 text-xl font-bold text-deep">Nous allons étudier</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        <li>la nature mathématique d’une image ;</li>
        <li>la représentation numérique des pixels ;</li>
        <li>les transformations géométriques ;</li>
        <li>les traitements fréquentiels ;</li>
        <li>l’extraction d’informations ;</li>
        <li>la vision par ordinateur moderne ;</li>
        <li>les réseaux neuronaux appliqués aux images.</li>
      </ul>

      <Callout variant="important" title="Progression scientifique et pédagogique">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Comprendre ce qu’est réellement une image</strong>
          </li>
          <li>
            <strong>Manipuler mathématiquement les images</strong>
          </li>
          <li>
            <strong>Extraire des informations utiles</strong>
          </li>
          <li>
            <strong>Reconnaître et interpréter le contenu</strong>
          </li>
          <li>
            <strong>Construire des systèmes intelligents de vision</strong>
          </li>
        </ol>
      </Callout>

      <h3 className="mt-10 text-xl font-bold text-deep">Plan détaillé — toutes les parties et sections</h3>
      <p className="mt-2 text-sm text-muted">
        Ci-dessous le syllabus intégral : chaque puce et chaque formule du plan officiel. Clique sur un chapitre pour
        accéder au contenu développé avec explications.
      </p>
      <ImagePlanOutline compact />

      <h3 className="mt-10 text-xl font-bold text-deep">Ce que tu maîtriseras à la fin</h3>
      <p className="mt-2 text-muted">Tu sauras :</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        {imageMasteryOutcomes.map((item) => (
          <li key={item}>{item} ;</li>
        ))}
      </ul>

      <Callout variant="resume" title="Équivalence académique">
        <p className="text-muted">Ce cours correspond pratiquement à :</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {imageAcademicScope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>

      <p className="mt-8">
        <Link
          to={`${base}/nature-image-pixel`}
          className="inline-flex rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          Commencer — Chapitre 1
        </Link>
      </p>
    </>
  )
}
