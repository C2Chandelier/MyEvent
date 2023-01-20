<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SortiesParticipantsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SortiesParticipantsRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['sortie_id' => 'exact','user_id' => 'exact'])]
#[ApiResource(paginationEnabled: false,normalizationContext: ['groups' => ['sortiesParticipants']])]
class SortiesParticipants
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('sortiesParticipants')]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[Groups('sortiesParticipants')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Sortie $sortie_id = null;

    #[ORM\ManyToOne]
    #[Groups('sortiesParticipants')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSortieId(): ?Sortie
    {
        return $this->sortie_id;
    }

    public function setSortieId(?Sortie $sortie_id): self
    {
        $this->sortie_id = $sortie_id;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }
}
