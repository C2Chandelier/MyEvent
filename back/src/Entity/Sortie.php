<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SortieRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SortieRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['owner_id' => 'exact','event_id' => 'partial'])]
#[ApiResource(paginationEnabled: false,normalizationContext: ['groups' => ['sortie']])]
class Sortie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user','sortie'])]
    private ?int $id = null;

    
    #[ORM\Column]
    #[Groups(['user','sortie'])]
    private ?string $event_id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['user','sortie'])]
    private ?User $owner_id = null;

    #[ORM\Column]
    #[Groups(['user','sortie'])]
    private ?bool $visibility = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEventId(): ?string
    {
        return $this->event_id;
    }

    public function setEventId(string $event_id): self
    {
        $this->event_id = $event_id;

        return $this;
    }

    public function getOwnerId(): ?User
    {
        return $this->owner_id;
    }

    public function setOwnerId(?User $owner_id): self
    {
        $this->owner_id = $owner_id;

        return $this;
    }

    public function isVisibility(): ?bool
    {
        return $this->visibility;
    }

    public function setVisibility(bool $visibility): self
    {
        $this->visibility = $visibility;

        return $this;
    }
}
