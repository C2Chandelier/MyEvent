<?php

namespace App\Repository;

use App\Entity\SortiesParticipants;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SortiesParticipants>
 *
 * @method SortiesParticipants|null find($id, $lockMode = null, $lockVersion = null)
 * @method SortiesParticipants|null findOneBy(array $criteria, array $orderBy = null)
 * @method SortiesParticipants[]    findAll()
 * @method SortiesParticipants[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SortiesParticipantsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SortiesParticipants::class);
    }

    public function save(SortiesParticipants $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SortiesParticipants $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return SortiesParticipants[] Returns an array of SortiesParticipants objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SortiesParticipants
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
